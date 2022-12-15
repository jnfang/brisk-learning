import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css'


export default function Home() {

  const transform_endpoint = 'https://brisk-d3f02.wl.r.appspot.com/transform';
  const [newContent, setNewContent] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const article = event.target.article;
    const lexile = event.target.lexile;

    // TODO: make this validation prettier
    if (!article.value || !lexile.value) {
      alert("Please fill out all fields");
      return;
    } 
    const data = {
      article: article.value,
      lexile: lexile.value,
    }
    console.log(data);
    setLoading(true);
    const res = await fetch(transform_endpoint, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
    setLoading(false);
    setNewContent(result.articleContent);
    console.log(result);
  };

  const NavBar = () => {
    return(
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Brisk</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    )
  }

  const HeaderDetails = () => {
    return(
      <div className="hero h-30">
        <div className="hero-content text-center ">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Any text. </h1>
            <h1 className="text-5xl font-bold">Any reading level.</h1>
            <p className="py-3">We know how hard it is to incorporate current events and other content into your classroom. Brisk is the answer.</p>
          </div>
        </div>
      </div>
    )
  }

  const DropDown = () => {
    return(
      <select name="lexile" className="select adjacent-input select-bordered w-full my-2 mx-2 max-w-xs">
        <option value='600'>600L</option>
        <option value='700'>700L</option>
        <option value='800'>800L</option>
        <option value='800'>900L</option>
        <option value='1000'>1000L</option>
        <option value='1100'>1100L</option>
        <option value='1200'>1200L</option>
      </select>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Brisk</title>
        <meta name="description" content="AI generated content across reading levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <NavBar></NavBar>
          <HeaderDetails></HeaderDetails>
          <div className="artboard artboard-demo my-2 min-h-screen">
            <form className="form-control w-full p-4" onSubmit={handleSubmit}>
              <div className="form-control">
                <div className="grid grid-flow-row auto-rows-max">
                  <label className="label adjacent-input" >
                    <span className="label-text adjacent-input">Read this text in</span>
                  </label>
                  <DropDown></DropDown>
                  <button type="submit" className="generate-btn btn btn-primary my-2 mx-2">Convert</button>
                </div>
                <div className="flex">
                  <textarea name="article" className="textarea textarea-bordered my-3 w-1/2"></textarea>
                  <div name="article" className="flex justify-start content-start border rounded my-3 mx-5 p-5 min-h-screen w-1/2">
                    {newContent && !loading?
                      <div name="result" className="whitespace-pre-line text-top text-left p-10" >{newContent}</div>
                      : null }
                      {loading ?
                        <div className="loader"> </div> : null
                      }
                  </div>
                </div>
              </div>
            </form>
          </div>
      </main>
    </div>
  )
}
