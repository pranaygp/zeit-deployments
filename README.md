# ▲ZEIT deployments

A little webserver and frontend to list all your ▲ZEIT now deployments easily.

I've personally deployed a single instance of this app using now (haha) and I just use the URL for this deployment to easily go to all my other deployments.

> The biggest use case (and the motivation behind this) is when I need to share a file with myself and access it on a public/different computer, I can just `now deploy` it from my laptop, and then open an incognito tab on a public PC and go to my now deployments URL :)

I've also abstracted this out so you can use it for yourself by simply setting an environment variable :)

# Setup

Click this button :)

> On the page that opens, follow the link to create a new ZEIT API TOKEN and paste that on both fields `ZEIT API TOKEN` AND `NOW_API_KEY`


[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/pranaygp/zeit-deployments&env=NOW_API_KEY)

Note: This project uses your API TOKEN to receive the list of all deployments from ▲ZEIT. That's what makes this so easy :)  
