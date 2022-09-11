# ajou-print-on-air

## Intro

`Ajou Print-on-Air` allows you print in ajou-u public printer with Mac.

## How to install

### Install Driver

[Canon Mac UFR II Driver](https://asia.canon/en/support/0101135101?model=3327C006)

### Install dependencies and env file

#### Easy Install

~~~
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/khskeb0513/ajou-print-on-air/master/install.sh)"
~~~

#### Manual Install

> You must install node.js and ghostscript.
> Homebrew, pm2, git is optional.

~~~
# install git
git

# install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install node and ghostscript
# If you don't have homebrew, you have to install dependencies manually.
brew install node ghostscript

# install pm2
# pm2 is for run in background.
npm install -g pm2

# clone project
# If you don't have git, you have to download entire project.
git clone https://github.com/khskeb0513/ajou-print-on-air

# make env.yml file
# To set username.
cd ajou-print-on-air
touch env.yml
echo ""
echo -n "Phone number: " && read NICKNAME
echo "nickname: '$NICKNAME'" > env.yml
