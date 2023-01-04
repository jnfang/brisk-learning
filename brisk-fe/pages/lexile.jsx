import Head from 'next/head'
import React from 'react';
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link' 

import NavBar from '../components/NavBar';

export default function Home() {

  const transform_endpoint = 'http://127.0.0.1:8080/transform';
  
  const [newContent, setNewContent] = useState(null);

  const [loading, setLoading] = useState(false);

  const copyToClipboard = () => {navigator.clipboard.writeText(newContent)} 

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
                <div className="flex">
                  <label className="label adjacent-input" >
                    <span className="label-text adjacent-input">Read this text in</span>
                  </label>
                  <DropDown></DropDown>
                  <button type="submit" className="generate-btn btn btn-primary my-2 mx-2">Convert</button>
                </div>
                <div className="flex">
                  <textarea name="article" className="textarea textarea-bordered my-3 w-1/2"></textarea>
                  <div name="article" className="flex justify-start content-start border rounded my-3 mx-5 p-5 min-h-screen w-1/2 relative">
                    {newContent && !loading?
                      <div>
                        <FontAwesomeIcon
                          className="absolute box-border h-5 w-5 copy-btn"
                          icon={faCopy}
                          onClick={copyToClipboard}
                        />
                        <div name="result" className="whitespace-pre-line text-top text-left p-10" >
                          {newContent}
                        </div>
                      </div>
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
