tty_blue="$(tty_mkbold 34)"
tty_bold="$(tty_mkbold 39)"
tty_reset="$(tty_escape 0)"
shell_join() {
  local arg
  printf "%s" "$1"
  shift
  for arg in "$@"
  do
    printf " "
    printf "%s" "${arg// /\ }"
  done
}

ohai() {
  printf "${tty_blue}==>${tty_bold} %s${tty_reset}\n" "$(shell_join "$@")"
}

ohai ""
ohai "========== Homebrew 설치 =========="
ohai ""
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

ohai ""
ohai "========== node.js ghostscript 설치 =========="
ohai ""
brew install node ghostscript

ohai ""
ohai "========== pm2 설치 =========="
ohai ""
npm install -g pm2

ohai ""
ohai "========== git 설치 확인 =========="
ohai ""
git

ohai ""
ohai "========== ajou-print-on-air 프로젝트 복제 =========="
ohai ""
git clone https://github.com/khskeb0513/ajou-print-on-air

ohai ""
ohai "========== ajou-print-on-air 프로젝트 실행 =========="
ohai ""
cd ajou-print-on-air
pm2 start

ohai ""
ohai "** 스크립트 끝 **"
