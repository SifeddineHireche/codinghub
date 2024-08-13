import React, {useState} from 'react';
import { isElementOfType } from 'react-dom/test-utils';


export default function ComponentMio() {
  const [text,setText] = useState()
  const [updated,setUpdated] = useState()
const textOnChange = (event) => {
    setText(event.target.value)

}

const buttonOnClick = () => {
    setUpdated(text)

}


<html lang="fr">
    <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content="La site de référencement des experts formateurs indépendants du digital et des fonctions support. Vous voulez gagner en visibilité ? Référencement gratuit, exclusif et sans engagement !"/>  
    <title>Thomas Dupont - Développeur web - Mon parcours</title>
    <meta property="og:title" content="Thomas Dupont - Développeur web - Mon parcours"/>
    <meta property="og:description" content="La site de référencement des experts formateurs indépendants du digital et des fonctions support. Vous voulez gagner en visibilité ? Référencement gratuit, exclusif et sans engagement !"/>
    <meta name="author" content="Thomas Dupont"/>
    <meta name="robots" content="index, follow"/>
    <meta property="og:image" content="/images/thomas-dupont-og-image.png"/>
    <meta property="og:url" content="https://thomas-dupont.io/about"/>
    <link rel="canonical" href="https://thomas-dupont.io/about"/>
    <link rel="icon" href="/images/photo_profil_background_ico.webp"/>
    <link rel="stylesheet" href="css/global.css"/>
    <link rel="stylesheet" href="css/about.css"/>
    <script src="/js/global.js" defer=""></script>
</head>
<body>
   <header>
    <nav class="main-nav">
        <a class="logo" href="/">
            <img loading="lazy" width="75" height="50" src="/images/photo_profil.webp" alt="Photo de profil de Thomas Dupont"/>
        </a>
        <div class="burger-menu" onclick="toggleMenu()">☰</div>
        <ul class="nav-list">
            <li><div class="burger-menu" onclick="toggleMenu()">X</div></li>
            <li><a href="/about">Mon Parcours</a></li>
            <li><a href="/formations">Formations</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a id="rdv-responsive" target="_blank" href="https://calendly.com/thomas-dupont-training/30min"><button class="button-primary">Prendre rendez-vous</button></a></li>
        </ul>
        <a id="rdv" target="_blank" href="https://calendly.com/thomas-dupont-training/30min"><button class="button-primary">Prendre rendez-vous</button></a>
    </nav>
</header>

    <main>
        <div class="breadcrumb">
    <nav>
        <ul>
            <li><a href="/">Accueil</a><span> &gt; </span></li>
            
                <li>
                    
                        <span>Mon parcours</span>
                    
                </li>
            
            
        </ul>
    </nav>
</div>

        <section class="main-section main-background">
            <h1>Mon parcours</h1>
        </section>
        <a href="/contact"><button class="button-primary cartouche-button center">Télécharger mon CV</button></a>
        <section>
            <ul class="timeline">
                <li>
                    <p class="date">2023</p>
                    <h2 class="title">Projets personnels</h2>
                    <p class="descr">
                        <span>Avec Kevin, nous avons lancé plusieurs boutiques e-commerce en dropshipping sur des produits spécifiques. Je me suis concentré sur le copywriting, l'optimisation du site sous Shopify et la gestion des commandes et du SAV.</span>
                        <span>Aujourd'hui, je gère une plateforme de référencement de formations professionnelles : <a target="_blank" href="https://monformateurindépendant.com">Mon Formateur Indépendant</a></span>
                    </p>
                </li>
                <li>
                    <p class="date">2021</p>
                    <h2 class="title">Edulib</h2>
                    <p class="descr">Nous construisons une application de lecture de manuels scolaires numériques. <a target="_blank" href="https://www.edulib.fr/">Edulib</a>, nous devons gérer la scalabilité très forte et le besoin vital de cybersécurité (1,5 millions d'élève mineur)</p>
                </li>
                <li>
                    <p class="date">2017</p>
                    <h2 class="title">Shadow</h2>
                    <p class="descr">J'ai rejoins <a target="_blank" href="https://shadow.tech/fr-FR">Shadow</a>, pour mettre en place le e-commerce et la gestion des accès des clients. Les problématiques de SEO, paiement, RGPD et cybersécurité étaient centrales.</p>
                </li>
                <li>
                    <p class="date">2016-2017</p>
                    <h2 class="title">Première mission long terme</h2>
                    <p class="descr">J'ai rejoins une société <a target="_blank" href="https://o2i-ingenierie.com/">o2i</a>, nous avions des projets pour L'oréal, Channel et Louis Vuitton. Les sujets concernaient essentiellement l'UX et la confidentialité.</p>
                </li>
                <li>
                    <p class="date">2016</p>
                    <h2 class="title">Freelance</h2>
                    <p class="descr">Durant 1 an, j'ai lancé un projet de bot juridique et réalisé des missions pour des petites startups. J'ai principalement utilisé Facebook pour la partie prospection.</p>
                </li>
                <li>
                    <p class="date">2013</p>
                    <h2 class="title">Spolzik</h2>
                    <p class="descr">Avec un associé <a target="_blank" href="https://www.kevin-mercier.co/">Kevin Mercier</a>, nous avons lancé Spolzik, un réseau social de partage de musiques. Le projet a été stoppé en 2015.</p>
                </li>
                <li>
                    <p class="date">2013</p>
                    <h2 class="title">Diplômé DSCG (expertise comptable)</h2>
                    <p class="descr">Obtenu via un parcours en alternance en contrôle de gestion au sein du groupe <a target="_blank" href="https://www.faurecia.com/">Faurecia</a>, J'ai participé à des migrations SAP et des plans d'économies.</p>
                </li> 
            </ul>
        </section>
        <section>
            <h2>Profils</h2>
            <br/>
            <p class="center-text">Membre de <a target="_blank" rel="dofollow" href="https://annuaire-coaching.fr">annuaire-coaching.fr</a></p>
            </section>
            </main>
<footer>
    <div>
        <div>
            <a href="/legal-notice">Mentions légales</a>
            <a href="/terms-of-sale">CGV</a>
            <a href="/contact">Contact</a>
            <a href="https://www.linkedin.com/in/thomas-dupont-1/" target="_blank"><img width="16" height="16" src="/images/icons/linkedin.png" alt="linkedin icon" loading="lazy"/></a>
        </div>
        <div>
            <p>© 2023 Thomas Dupont</p>
        </div>
    </div>
</footer>



</body>
</html>
        
    }


