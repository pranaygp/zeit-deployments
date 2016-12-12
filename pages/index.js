import React, {Component} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import css from 'next/css';
import moment from 'moment';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Index extends Component {
  static async getInitialProps({ res }){

    const data = res ? await fetch('https://api.zeit.co/now/deployments', {
      method: 'GET',
      headers: new Headers({
        'authorization': `Bearer ${process.env.NOW_API_KEY}`,
        'cache-control': 'no-cache'
      })
    }).then(r => r.json()) : { deployments: [] }

    return {
      deployments: data.deployments.map(d => Object.assign({}, d, {created: Number(d.created)})).sort((a, b) => b.created - a.created)
    }
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1'></meta>
          <meta name="og:image" content="https://cdn.zeit.co/zeit/twitter-card.png"/>
          <link rel="apple-touch-icon" sizes="57x57" href="https://cdn.zeit.co/favicon/apple-touch-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="https://cdn.zeit.co/favicon/apple-touch-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="https://cdn.zeit.co/favicon/apple-touch-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="https://cdn.zeit.co/favicon/apple-touch-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="https://cdn.zeit.co/favicon/apple-touch-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="https://cdn.zeit.co/favicon/apple-touch-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="https://cdn.zeit.co/favicon/apple-touch-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="https://cdn.zeit.co/favicon/apple-touch-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.zeit.co/favicon/apple-touch-icon-180x180.png"/>
          <link rel="icon" type="image/png" href="https://cdn.zeit.co/favicon/favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" type="image/png" href="https://cdn.zeit.co/favicon/android-chrome-192x192.png" sizes="192x192"/>
          <link rel="icon" type="image/png" href="https://cdn.zeit.co/favicon/favicon-96x96.png" sizes="96x96"/>
          <link rel="icon" type="image/png" href="https://cdn.zeit.co/favicon/favicon-16x16.png" sizes="16x16"/>
          <link rel="manifest" href="https://cdn.zeit.co/favicon/manifest.json"/>
          <link rel="mask-icon" href="https://cdn.zeit.co/favicon/safari-pinned-tab.svg" color="#ffffff"/>
          <link rel="shortcut icon" href="https://cdn.zeit.co/favicon/favicon.ico"/>
          <meta name="theme-color" content="#000"/>
          <title>ZEIT Deployments</title>
        </Head>
        <h1 className={css(styles.title)}>My ▲ZEIT Deployments</h1>
        <ol className={css(styles.list)}>
          {
            this.props.deployments.map(d => <li key={d.uid} ><Link href={`https://${d.url}`}>{d.name}</Link> <span className={css(styles.date)}>{moment.unix(d.created/1000).fromNow()}</span></li>)
          }
        </ol>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '1em',
    textRendering: 'geometricPrecision'
  },
  title: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: '30px',
    fontWeight: 200,
    lineHeight: '40px'
  },
  list: {
    width: '50%',
    fontFamily: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif',
    fontSize: '12px',
    lineHeight: '18px',
    '@media screen and (max-width: 600px)': {
      width: 'inherit'
    },
    ' a': {
      color: '#067df7',
      textDecoration: 'none',
      ":hover": {
        textDecoration: 'underline'
      }
    }
  },
  date: {
    color: '#5c5c5c',
    float: 'right'
  }
};

export default Index;