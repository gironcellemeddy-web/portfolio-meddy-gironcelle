// Bande-son arcade ORIGINALE générée en temps réel (Web Audio API).
// Aucun fichier audio, aucune œuvre tierce : tous les sons sont synthétisés
// à la volée (oscillateurs + enveloppes), donc libres de droit.
// L'AudioContext n'est créé qu'après une interaction utilisateur (règle des
// navigateurs) : la première note part au lancement de la partie.

type Kind = "diploma" | "quality" | "experience";

export class GameAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sirenOsc: OscillatorNode | null = null;
  private sirenGain: GainNode | null = null;
  private sirenTimer: number | null = null;
  private pelletToggle = false;
  muted = false;

  constructor(muted = false) {
    this.muted = muted;
  }

  /** Crée (ou réveille) le contexte audio — à appeler sur un geste utilisateur. */
  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.35;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.35, this.ctx.currentTime, 0.02);
    }
  }

  /** Note simple : forme d'onde, fréquence, durée, volume. */
  private note(
    freq: number,
    dur: number,
    type: OscillatorType = "square",
    vol = 0.5,
    delay = 0,
    glideTo?: number,
  ) {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(30, glideTo), t0 + dur);
    // Enveloppe percussive (attaque courte, décroissance douce)
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  /** Petite fanfare d'ouverture (arpège montant) au lancement de la partie. */
  intro() {
    const seq: [number, number][] = [
      [392, 0], [523, 0.1], [659, 0.2], [784, 0.3], [659, 0.42], [784, 0.52],
    ];
    seq.forEach(([f, d]) => this.note(f, 0.14, "square", 0.42, d));
    this.note(196, 0.5, "triangle", 0.25, 0);
  }

  /** Pastille avalée : deux tons alternés (effet « va-et-vient » arcade). */
  pellet() {
    this.pelletToggle = !this.pelletToggle;
    this.note(this.pelletToggle ? 520 : 380, 0.07, "square", 0.22, 0, this.pelletToggle ? 380 : 520);
  }

  /** Collecte d'un élément du CV : arpège coloré selon la famille. */
  collect(kind: Kind) {
    const base = kind === "diploma" ? 523 : kind === "quality" ? 659 : 440;
    [0, 0.09, 0.18].forEach((d, i) => {
      this.note(base * Math.pow(1.26, i), 0.16, "square", 0.4, d);
    });
    this.note(base / 2, 0.34, "triangle", 0.2, 0);
  }

  /** Vie perdue : glissando descendant. */
  death() {
    this.stopSiren();
    this.note(440, 0.55, "sawtooth", 0.35, 0, 90);
    this.note(220, 0.6, "square", 0.2, 0.05, 60);
  }

  /** Victoire : fanfare montante. */
  win() {
    this.stopSiren();
    const seq: [number, number][] = [
      [523, 0], [659, 0.1], [784, 0.2], [1047, 0.32], [784, 0.46], [1047, 0.56], [1319, 0.68],
    ];
    seq.forEach(([f, d]) => this.note(f, 0.18, "square", 0.42, d));
  }

  /** Fin de partie : cadence descendante. */
  gameOver() {
    this.stopSiren();
    const seq: [number, number][] = [[392, 0], [349, 0.16], [294, 0.32], [196, 0.5]];
    seq.forEach(([f, d], i) => this.note(f, i === 3 ? 0.6 : 0.2, "sawtooth", 0.3, d));
  }

  /** Sirène d'ambiance en boucle pendant le jeu (montée/descente lente). */
  startSiren() {
    const ctx = this.ensure();
    if (!ctx || !this.master || this.sirenOsc) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 220;
    g.gain.value = 0.055; // discret : ne couvre jamais les effets
    osc.connect(g);
    g.connect(this.master);
    osc.start();
    this.sirenOsc = osc;
    this.sirenGain = g;

    // Balayage lent de la hauteur (effet sirène d'arcade).
    let up = true;
    const sweep = () => {
      if (!this.ctx || !this.sirenOsc) return;
      const t = this.ctx.currentTime;
      this.sirenOsc.frequency.linearRampToValueAtTime(up ? 330 : 190, t + 0.9);
      up = !up;
    };
    sweep();
    this.sirenTimer = window.setInterval(sweep, 900);
  }

  stopSiren() {
    if (this.sirenTimer) {
      window.clearInterval(this.sirenTimer);
      this.sirenTimer = null;
    }
    if (this.sirenOsc && this.ctx && this.sirenGain) {
      const t = this.ctx.currentTime;
      this.sirenGain.gain.setTargetAtTime(0.0001, t, 0.05);
      this.sirenOsc.stop(t + 0.3);
    }
    this.sirenOsc = null;
    this.sirenGain = null;
  }

  dispose() {
    this.stopSiren();
    if (this.ctx) void this.ctx.close();
    this.ctx = null;
    this.master = null;
  }
}
