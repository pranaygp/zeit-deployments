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