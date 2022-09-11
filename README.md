# ajou-print-on-air

## How to install

### Install dependencies

#### Easy Install

~~~
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/khskeb0513/ajou-print-on-air/master/install.sh)"
~~~

#### Manual Install

~~~
# install git
git

# install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install node and ghostscript
brew install node ghostscript

# install pm2
npm install -g pm2

# clone project
git clone https://github.com/khskeb0513/ajou-print-on-air

# make env.yml file
cd ajou-print-on-air
touch env.yml
echo -n "Phone number: " && read NICKNAME
echo "nickname: '$NICKNAME'" > env.yml
