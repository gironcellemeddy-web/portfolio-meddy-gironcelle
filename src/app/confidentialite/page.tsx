import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Meddy Gironcelle",
  description:
    "Quelles données ce portfolio traite, pourquoi, combien de temps, avec qui — et vos droits (RGPD).",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

// RGPD (art. 13) — rédigée à partir des traitements RÉELLEMENT présents dans le
// code : aucun formulaire, aucun compte, aucune newsletter, aucun cookie
// publicitaire. Voir le rapport de conformité pour les champs à vérifier.
export default function Confidentialite() {
  return (
    <LegalPage eyebrow="/ Informations légales" title="Politique de confidentialité" updated="19 septembre 2026">
      <p>
        Ce portfolio est un site personnel. Il <strong>ne comporte aucun formulaire, aucun compte
        utilisateur, aucune newsletter ni aucun paiement</strong>. Les seules données personnelles
        traitées le sont de façon technique, lors de votre navigation, et sont décrites ci-dessous
        sans omission.
      </p>
      <p>
        <strong>Responsable du traitement :</strong> Meddy Gironcelle —{" "}
        <a href="mailto:gironcellemeddy@gmail.com">gironcellemeddy@gmail.com</a>.
      </p>

      <h2>1. Les traitements, un par un</h2>

      <h3>1.1 Hébergement et journaux techniques</h3>
      <table>
        <tbody>
          <tr><th>Données</th><td>Adresse IP, type de navigateur, pages demandées, horodatage (journaux serveur).</td></tr>
          <tr><th>Finalité</th><td>Afficher le site, garantir sa sécurité et détecter les abus.</td></tr>
          <tr><th>Base légale</th><td>Intérêt légitime (fonctionnement et sécurité du site).</td></tr>
          <tr><th>Durée</th><td>Journaux techniques conservés par l&apos;hébergeur pendant une durée limitée (de l&apos;ordre de quelques jours à quelques semaines), conformément à sa politique de confidentialité.</td></tr>
          <tr><th>Destinataires</th><td>Vercel Inc. (hébergeur), États-Unis.</td></tr>
          <tr><th>Transfert hors UE</th><td>Oui — États-Unis. Garantie : accord de traitement des données (DPA) de Vercel, incluant les clauses contractuelles types de la Commission européenne.</td></tr>
        </tbody>
      </table>

      <h3>1.2 Mesure d&apos;audience (Vercel Web Analytics)</h3>
      <table>
        <tbody>
          <tr><th>Données</th><td>Page consultée, site d&apos;origine, pays, type d&apos;appareil, navigateur et système. L&apos;adresse IP sert à calculer un identifiant <em>haché</em> et anonyme, valable une journée ; elle n&apos;est pas conservée en clair. <strong>Aucun cookie n&apos;est déposé.</strong></td></tr>
          <tr><th>Finalité</th><td>Connaître la fréquentation du portfolio (nombre de visiteurs, pages vues).</td></tr>
          <tr><th>Base légale</th><td>Intérêt légitime (mesure d&apos;audience strictement nécessaire, sans suivi entre sites ni recoupement).</td></tr>
          <tr><th>Durée</th><td>Données agrégées uniquement, sans identifiant persistant ; conservées selon l&apos;offre Vercel en cours (statistiques mensuelles).</td></tr>
          <tr><th>Destinataires</th><td>Vercel Inc., États-Unis (mêmes garanties qu&apos;en 1.1).</td></tr>
        </tbody>
      </table>

      <h3>1.3 Carte 3D de La Réunion</h3>
      <table>
        <tbody>
          <tr><th>Données</th><td>Adresse IP et type de navigateur, transmis lorsque votre navigateur télécharge les tuiles de la carte (uniquement quand vous atteignez la section « Mon île, mon regard »).</td></tr>
          <tr><th>Finalité</th><td>Afficher le relief de l&apos;île en arrière-plan.</td></tr>
          <tr><th>Base légale</th><td>Intérêt légitime (affichage d&apos;un contenu du site). Aucun cookie, aucun suivi.</td></tr>
          <tr><th>Durée</th><td>Ce site ne conserve rien ; journaux techniques des fournisseurs selon leurs politiques.</td></tr>
          <tr><th>Destinataires</th><td>CARTO (fond de carte, <a href="https://carto.com/privacy" target="_blank" rel="noopener noreferrer">politique</a>) et Amazon Web Services (tuiles de relief, jeu de données ouvert), États-Unis.</td></tr>
          <tr><th>Transfert hors UE</th><td>Oui — États-Unis, sous les clauses contractuelles types ou le Data Privacy Framework auxquels ces fournisseurs sont soumis.</td></tr>
        </tbody>
      </table>

      <h3>1.4 Contact par courriel</h3>
      <table>
        <tbody>
          <tr><th>Données</th><td>Celles que vous choisissez d&apos;écrire (nom, adresse e-mail, message) lorsque vous cliquez sur « Me contacter » et envoyez un courriel.</td></tr>
          <tr><th>Finalité</th><td>Répondre à votre demande (candidature, collaboration, question).</td></tr>
          <tr><th>Base légale</th><td>Intérêt légitime / mesures précontractuelles prises à votre demande.</td></tr>
          <tr><th>Durée</th><td>Le temps de l&apos;échange, puis au plus un an après le dernier contact.</td></tr>
          <tr><th>Destinataires</th><td>Meddy Gironcelle, via la messagerie Gmail (Google Ireland Ltd / Google LLC, États-Unis — Data Privacy Framework).</td></tr>
        </tbody>
      </table>

      <h3>1.5 Préférences enregistrées sur votre appareil</h3>
      <p>
        Le site mémorise, <strong>uniquement dans votre navigateur</strong> (stockage local), vos
        choix d&apos;affichage : thème clair ou sombre, et pour le mini-jeu, thème, niveau de
        difficulté et son activé ou coupé. Ces informations <strong>ne sont jamais transmises</strong>{" "}
        à qui que ce soit et sont effaçables à tout moment depuis les réglages de votre navigateur.
      </p>

      <h2 id="cookies">2. Cookies et traceurs</h2>
      <p>
        <strong>Ce site ne dépose aucun cookie ni traceur non nécessaire.</strong> C&apos;est pourquoi
        aucun bandeau de consentement ne vous est présenté : la réglementation (CNIL, directive
        ePrivacy) ne l&apos;exige que pour les traceurs non indispensables, et il n&apos;y en a pas.
      </p>
      <table>
        <thead>
          <tr><th>Nom</th><th>Type</th><th>Émetteur</th><th>Finalité</th><th>Durée</th></tr>
        </thead>
        <tbody>
          <tr><td><code>site-theme</code></td><td>stockage local</td><td>ce site</td><td>Mémoriser le thème clair/sombre</td><td>jusqu&apos;à effacement par vous</td></tr>
          <tr><td><code>pac-cv-theme</code>, <code>pac-cv-diff</code>, <code>pac-cv-muted</code></td><td>stockage local</td><td>ce site</td><td>Préférences du mini-jeu (thème, difficulté, son)</td><td>jusqu&apos;à effacement par vous</td></tr>
          <tr><td><code>NEXT_LOCALE</code></td><td>cookie</td><td>ce site</td><td>Langue d&apos;affichage — <em>lu uniquement s&apos;il existe ; le site ne le crée jamais</em></td><td>—</td></tr>
        </tbody>
      </table>
      <p>
        Aucun cookie publicitaire, aucun pixel de réseau social, aucune vidéo embarquée, aucun
        service de chat. La mesure d&apos;audience (1.2) fonctionne sans cookie.
      </p>

      <h2>3. Vos droits</h2>
      <p>
        Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit
        d&apos;<strong>accès</strong>, de <strong>rectification</strong>, d&apos;<strong>effacement</strong>,
        d&apos;<strong>opposition</strong>, de <strong>limitation</strong> et de{" "}
        <strong>portabilité</strong> de vos données. Pour les exercer, écrivez à{" "}
        <a href="mailto:gironcellemeddy@gmail.com">gironcellemeddy@gmail.com</a> ; une réponse vous
        sera apportée sous un mois. Concrètement, la seule donnée identifiante que ce site peut
        détenir est un courriel que vous m&apos;auriez envoyé : sa suppression est immédiate sur
        simple demande.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la{" "}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
          CNIL
        </a>{" "}
        (3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07).
      </p>

      <h2>4. Sécurité</h2>
      <p>
        Le site est servi en HTTPS. Aucune donnée n&apos;est stockée par le site lui-même : il
        n&apos;existe ni base de données, ni espace membre.
      </p>

      <h2>5. Modifications</h2>
      <p>
        Cette politique sera mise à jour si un nouveau traitement apparaît (par exemple l&apos;ajout
        d&apos;un formulaire de contact). La date en tête de page fait foi. Voir aussi les{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>
    </LegalPage>
  );
}
