import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — Meddy Gironcelle",
  description:
    "Identité de l'éditeur, hébergeur, propriété intellectuelle et crédits du portfolio de Meddy Gironcelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

// LCEN (loi n° 2004-575, art. 6-III) : site personnel édité par une personne
// physique à titre non professionnel. Les champs [À COMPLÉTER] / [À VÉRIFIER]
// sont listés dans le rapport de conformité.
export default function MentionsLegales() {
  return (
    <LegalPage eyebrow="/ Informations légales" title="Mentions légales" updated="19 septembre 2026">
      <h2>1. Éditeur du site</h2>
      <p>
        Ce site est un portfolio personnel, édité à titre <strong>non professionnel</strong> par une
        personne physique :
      </p>
      <ul>
        <li>
          <strong>Meddy Gironcelle</strong>, résidant à La Réunion (France)
        </li>
        <li>
          Contact : <a href="mailto:gironcellemeddy@gmail.com">gironcellemeddy@gmail.com</a>
        </li>
        <li>Directeur de la publication : Meddy Gironcelle</li>
      </ul>
      <p>
        Le site ne propose aucune vente de biens ou de services et ne constitue pas une activité
        commerciale. Aucun numéro SIRET, RCS ou TVA n&apos;est donc applicable.
      </p>

      <h2>2. Hébergeur</h2>
      <ul>
        <li>
          <strong>Vercel Inc.</strong>
        </li>
        <li>
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
        </li>
        <li>
          Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>{" "}
          · Contact : <a href="mailto:privacy@vercel.com">privacy@vercel.com</a>
        </li>
        <li>
          Téléphone : non communiqué par l&apos;hébergeur — contact par courriel ci-dessus
        </li>
      </ul>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du site (structure, textes, mise en page, code) est la création de Meddy
        Gironcelle. <strong>Toutes les photographies</strong> de la section « Photographie » sont
        des œuvres originales de Meddy Gironcelle, protégées par le Code de la propriété
        intellectuelle. Toute reproduction, diffusion ou utilisation, même partielle, est interdite
        sans autorisation écrite préalable.
      </p>
      <p>
        Les <strong>réalisations</strong> présentées (carrousels, affiches, publications) ont été
        conçues par Meddy Gironcelle dans le cadre de stages, notamment auprès de la Chambre de
        Métiers et de l&apos;Artisanat de La Réunion. Elles sont montrées <strong>à titre de
        démonstration de compétences</strong>, dans le respect des droits des organisations
        concernées ; toute demande de retrait de leur part sera honorée sans délai.
      </p>
      <p>
        Les <strong>marques et logos</strong> (Université de La Réunion, EDF, Chambre de Métiers et
        de l&apos;Artisanat de La Réunion, Antenne Réunion, RTL Réunion) sont la propriété exclusive
        de leurs titulaires respectifs. Ils sont reproduits uniquement pour faire référence, de
        façon factuelle, aux formations suivies et aux stages effectués, sans qu&apos;aucun
        partenariat, parrainage ou approbation ne puisse en être déduit.
      </p>

      <h2>4. Crédits et licences</h2>
      <ul>
        <li>Développement : Next.js, React, Tailwind CSS (licence MIT) — icônes Lucide (licence ISC).</li>
        <li>Typographies : Kanit et Geist (licence SIL Open Font), servies depuis ce site.</li>
        <li>
          Carte 3D : MapLibre GL JS (licence BSD) · données cartographiques ©{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
            contributeurs OpenStreetMap
          </a>{" "}
          · fond de carte ©{" "}
          <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>{" "}
          · relief : Terrain Tiles (Mapzen / AWS Open Data).
        </li>
        <li>Contour géographique de l&apos;île : données ouvertes IGN / OpenStreetMap (licence ODbL).</li>
      </ul>

      <h2>5. Données personnelles et cookies</h2>
      <p>
        Les informations relatives au traitement de vos données et aux cookies figurent dans la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        Les informations publiées sont fournies à titre indicatif et peuvent évoluer. Les liens vers
        des sites tiers (Instagram, LinkedIn…) sont proposés pour information ; leur contenu relève
        de la seule responsabilité de leurs éditeurs.
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Le présent site est soumis au droit français. Pour toute question, écrivez à{" "}
        <a href="mailto:gironcellemeddy@gmail.com">gironcellemeddy@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
