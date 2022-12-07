import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      article: event.target.article.value,
      lexile: event.target.lexile.value,
    }
    const res = await fetch('https://formspree.io/f/xdojqzpr', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const result = await res.json();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Brisk</title>
        <meta name="description" content="AI generated content across reading levels" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
           {/* Page content here  */}
           <div className="artboard artboard-demo">
          <label htmlFor="my-drawer" className="btn btn-outline btn-primary drawer-button">Settings</label>
          <form className="form-control" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" >
                <span className="label-text">Your article content</span>
              </label>
              <textarea name="article" className="textarea textarea-bordered" placeholder="Blah blah blah"></textarea>
              <label className="label">
                <span className="label-text">What lexile level?</span>
              </label>
              <input type="text" name="lexile" placeholder="1200L" className="input input-bordered w-full max-w-xs" />
              <button type="submit" className="btn btn-primary">Generate</button>
              <label className="label">
                <span className="label-text">Result here</span>
              </label>
            </div>
          </form>
        </div> 
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* Sidebar content here */}
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
            
          </ul>
        </div>
      </div>
      </main>

    </div>
  )
}
