## Set up front-end

```
npm build
npm run dev
```

## Set up back-end server

1. Set up virtual env

```
python3 -m venv env
source env/bin/activate
```

1. Install requirements `pip install -r requirements.txt`
1. Create a new file `key.json` at `brisk-learning/api/key.json` with your private service key for GAE. To get your private key, follow the instructions here: https://firebase.google.com/docs/admin/setup#initialize-sdk Once you include it in your repo, make sure it's not checked into the Git
1. Run `python main.py`
1. View local API at `localhost:8080`

## Deployment

```
gcloud app deploy
gcloud app logs tail -s default
gcloud app browse
```
