import { Roboto, Lato, Open_Sans, Montserrat, Poppins, Raleway, Oswald, Merriweather, 
    Playfair_Display, Nunito, PT_Sans, PT_Serif, Rubik, Work_Sans, 
    Fira_Sans, Quicksand, Karla, Inter, Mulish, Lobster, Pacifico, Permanent_Marker, 
    Comfortaa, Bangers, Kalam, Dancing_Script, Shadows_Into_Light, Indie_Flower, 
    Architects_Daughter, Roboto_Condensed, Roboto_Slab, Ubuntu, Titillium_Web, 
    Noto_Sans, Noto_Serif, Exo_2, Josefin_Sans, Cabin, Arimo, Dosis, Oxygen, 
    Abel, Yanone_Kaffeesatz, Inconsolata, Bitter, Varela_Round, Archivo_Narrow, 
    Fjalla_One, Signika } from "next/font/google";

export const getSelectorPositionClass = (expandUp: boolean) => {
    return expandUp ? 'bottom-[100%] mb-2' : 'top-[100%] mt-2';
}

// Default font is Kalam 
export const defaultFont = Roboto({ subsets: ['latin'], weight: ['400'] });

const kalamFont = Kalam({ subsets: ['latin'], weight: ['400'] });
const lobster = Lobster({ subsets: ['latin'], weight: ['400'] });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'] });
const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: ['400'] });
const comfortaa = Comfortaa({ subsets: ['latin'], weight: ['400'] });
const bangers = Bangers({ subsets: ['latin'], weight: ['400'] });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400'] });
const shadowsIntoLight = Shadows_Into_Light({ subsets: ['latin'], weight: ['400'] });
const indieFlower = Indie_Flower({ subsets: ['latin'], weight: ['400'] });
const architectsDaughter = Architects_Daughter({ subsets: ['latin'], weight: ['400'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });
const lato = Lato({ subsets: ['latin'], weight: ['400'] });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['400'] });
const oswald = Oswald({ subsets: ['latin'], weight: ['400'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400'] });
const nunito = Nunito({ subsets: ['latin'], weight: ['400'] });
const ptSans = PT_Sans({ subsets: ['latin'], weight: ['400'] });
const ptSerif = PT_Serif({ subsets: ['latin'], weight: ['400'] });
const rubik = Rubik({ subsets: ['latin'], weight: ['400'] });
const workSans = Work_Sans({ subsets: ['latin'], weight: ['400'] });
const firaSans = Fira_Sans({ subsets: ['latin'], weight: ['400'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400'] });
const karla = Karla({ subsets: ['latin'], weight: ['400'] });
const inter = Inter({ subsets: ['latin'], weight: ['400'] });
const mulish = Mulish({ subsets: ['latin'], weight: ['400'] });
const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['400'] });
const robotoSlab = Roboto_Slab({ subsets: ['latin'], weight: ['400'] });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] });
const titilliumWeb = Titillium_Web({ subsets: ['latin'], weight: ['400'] });
const notoSans = Noto_Sans({ subsets: ['latin'] });
const notoSerif = Noto_Serif({ subsets: ['latin'], weight: ['400'] });
const exo2 = Exo_2({ subsets: ['latin'], weight: ['400'] });
const josefinSans = Josefin_Sans({ subsets: ['latin'], weight: ['400'] });
const cabin = Cabin({ subsets: ['latin'], weight: ['400'] });
const arimo = Arimo({ subsets: ['latin'], weight: ['400'] });
const dosis = Dosis({ subsets: ['latin'], weight: ['400'] });
const oxygen = Oxygen({ subsets: ['latin'], weight: ['400'] });
const abel = Abel({ subsets: ['latin'], weight: ['400'] });
const yanoneKaffeesatz = Yanone_Kaffeesatz({ subsets: ['latin'], weight: ['400'] });
const inconsolata = Inconsolata({ subsets: ['latin'], weight: ['400'] });
const bitter = Bitter({ subsets: ['latin'], weight: ['400'] });
const varelaRound = Varela_Round({ subsets: ['latin'], weight: ['400'] });
const archivoNarrow = Archivo_Narrow({ subsets: ['latin'], weight: ['400'] });
const fjallaOne = Fjalla_One({ subsets: ['latin'], weight: ['400'] });
const signika = Signika({ subsets: ['latin'], weight: ['400'] });

export const standardFonts = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Tahoma', label: 'Tahoma' },
    { value: 'Trebuchet MS', label: 'Trebuchet MS' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Garamond', label: 'Garamond' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'Brush Script MT', label: 'Brush Script MT' },
    { value: roboto.style.fontFamily, label: 'Roboto' },
    { value: lato.style.fontFamily, label: 'Lato' },
    { value: openSans.style.fontFamily, label: 'Open Sans' },
    { value: montserrat.style.fontFamily, label: 'Montserrat' },
    { value: poppins.style.fontFamily, label: 'Poppins' },
    { value: raleway.style.fontFamily, label: 'Raleway' },
    { value: oswald.style.fontFamily, label: 'Oswald' },
    { value: merriweather.style.fontFamily, label: 'Merriweather' },
    { value: playfairDisplay.style.fontFamily, label: 'Playfair Display' },
    { value: nunito.style.fontFamily, label: 'Nunito' },
    { value: ptSans.style.fontFamily, label: 'PT Sans' },
    { value: ptSerif.style.fontFamily, label: 'PT Serif' },
    { value: rubik.style.fontFamily, label: 'Rubik' },
    { value: workSans.style.fontFamily, label: 'Work Sans' },
    { value: firaSans.style.fontFamily, label: 'Fira Sans' },
    { value: quicksand.style.fontFamily, label: 'Quicksand' },
    { value: karla.style.fontFamily, label: 'Karla' },
    { value: inter.style.fontFamily, label: 'Inter' },
    { value: mulish.style.fontFamily, label: 'Mulish' },
    { value: robotoCondensed.style.fontFamily, label: 'Roboto Condensed' },
    { value: robotoSlab.style.fontFamily, label: 'Roboto Slab' },
    { value: ubuntu.style.fontFamily, label: 'Ubuntu' },
    { value: titilliumWeb.style.fontFamily, label: 'Titillium Web' },
    { value: notoSans.style.fontFamily, label: 'Noto Sans' },
    { value: notoSerif.style.fontFamily, label: 'Noto Serif' },
    { value: exo2.style.fontFamily, label: 'Exo 2' },
    { value: josefinSans.style.fontFamily, label: 'Josefin Sans' },
    { value: cabin.style.fontFamily, label: 'Cabin' },
    { value: arimo.style.fontFamily, label: 'Arimo' },
    { value: dosis.style.fontFamily, label: 'Dosis' },
    { value: oxygen.style.fontFamily, label: 'Oxygen' },
    { value: abel.style.fontFamily, label: 'Abel' },
    { value: yanoneKaffeesatz.style.fontFamily, label: 'Yanone Kaffeesatz' },
    { value: inconsolata.style.fontFamily, label: 'Inconsolata' },
    { value: bitter.style.fontFamily, label: 'Bitter' },
    { value: varelaRound.style.fontFamily, label: 'Varela Round' },
    { value: archivoNarrow.style.fontFamily, label: 'Archivo Narrow' },
    { value: fjallaOne.style.fontFamily, label: 'Fjalla One' },
    { value: signika.style.fontFamily, label: 'Signika' },
    { value: kalamFont.style.fontFamily, label: 'Kalam' },
    { value: lobster.style.fontFamily, label: 'Lobster' },
    { value: pacifico.style.fontFamily, label: 'Pacifico' },
    { value: permanentMarker.style.fontFamily, label: 'Permanent Marker' },
    { value: comfortaa.style.fontFamily, label: 'Comfortaa' },
    { value: bangers.style.fontFamily, label: 'Bangers' },
    { value: dancingScript.style.fontFamily, label: 'Dancing Script' },
    { value: shadowsIntoLight.style.fontFamily, label: 'Shadows Into Light' },
    { value: indieFlower.style.fontFamily, label: 'Indie Flower' },
    { value: architectsDaughter.style.fontFamily, label: 'Architects Daughter' },
  ];

export const fontFamilies = standardFonts;
export const DEFAULT_FONT = defaultFont.style.fontFamily;

export const searchFonts = (query: string) => {
    return fontFamilies.filter(font => 
        font.label.toLowerCase().includes(query.toLowerCase())
    );
};