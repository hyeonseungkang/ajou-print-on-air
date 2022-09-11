/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node ghostscript
npm install -g pm2
git
git clone https://github.com/khskeb0513/ajou-print-on-air
cd ajou-print-on-air
pm2 start
