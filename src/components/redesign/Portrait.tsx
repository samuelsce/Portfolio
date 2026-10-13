import { useEffect, useId, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { copy } from './copy';
// Presentation mask in the ORIGINAL photograph's coordinate system.
// Facial pixels, glasses and expression are not reconstructed.
export default function Portrait() {
  const id = useId().replaceAll(':', ''), { language } = useLanguage();
  const [small, setSmall] = useState(() => window.matchMedia('(max-width: 599px)').matches);
  useEffect(() => { const query = window.matchMedia('(max-width: 599px)'); const update = () => setSmall(query.matches); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return <svg className="portrait" viewBox="515 15 535 950" preserveAspectRatio="xMidYMax meet" role="img" aria-labelledby={id + '-title'}>
    <title id={id + '-title'}>{copy[language].portraitAlt}</title>
    <defs><clipPath id={id + '-clip'}><path d="M590 280C565 230 569 190 583 157C590 144 596 144 607 145C603 116 622 91 648 95C646 69 673 46 703 58C731 28 761 38 793 50C820 29 849 41 858 75C892 55 924 78 925 110C952 105 969 133 964 158C978 187 974 225 984 262C982 288 977 315 981 338C1005 363 990 400 991 441C981 477 963 490 956 547C953 581 934 599 920 611L910 657Q923 691 941 700L995 726Q1003 742 974 828L867 966L790 1152H535V926Q550 850 594 750L700 720Q747 700 770 677L763 616Q725 601 706 575Q678 545 655 472Q636 417 625 390Q605 350 608 315Q611 291 590 280Z" /></clipPath></defs>
    <image className="portrait-image" href={small ? '/portraits/samuel-source-small.webp' : '/portraits/samuel-source.webp'} width="2048" height="1152" preserveAspectRatio="none" clipPath={'url(#' + id + '-clip)'} />
  </svg>;
}
