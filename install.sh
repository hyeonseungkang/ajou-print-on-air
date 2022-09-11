echo ""
echo "========== Homebrew 설치 =========="
echo ""
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

echo ""
echo "========== node.js ghostscript 설치 =========="
echo ""
brew install node ghostscript

echo ""
echo "========== pm2 설치 =========="
echo ""
npm install -g pm2

echo ""
echo "========== git 설치 확인 =========="
echo ""
git

echo ""
echo "========== ajou-print-on-air 프로젝트 복제 =========="
echo ""
git clone https://github.com/khskeb0513/ajou-print-on-air

echo ""
echo "========== ajou-print-on-air 프로젝트 실행 =========="
echo ""
cd ajou-print-on-air
pm2 start

echo ""
echo "** 스크립트 끝 **"
