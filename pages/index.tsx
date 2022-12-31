import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Hero from '../components/hero/Hero';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/footer/Footer';

export async function getStaticProps(obj: { locale: string }) {
  const { locale } = obj;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['home'])),
    },
  };
}

export default function Home(props: any): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Head>
        <title>Kevin Poppe - Webentwickler</title>
        <meta
          name='description'
          content='Portfolio von Kevin Poppe - Webentwickler'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>

      <main className={styles.mainDiv}>
        <section>
          <Hero
            headline={t('home:headline')}
            subHeadline={t('home:subHeadline')}
          />
        </section>
        <section>
          <Navigation />
        </section>
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
