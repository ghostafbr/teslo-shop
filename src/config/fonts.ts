import {NextFont} from 'next/dist/compiled/@next/font';
import {Inter, Montserrat_Alternates} from 'next/font/google';


export const inter: NextFont = Inter({ subsets: ['latin'] });

export const titleFont: NextFont = Montserrat_Alternates({ subsets: ['latin'], weight: ['500', '700'] });
