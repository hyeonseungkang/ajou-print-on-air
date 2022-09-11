#!/bin/bash

# We don't need return codes for "$(command)", only stdout is needed.
# Allow `[[ -n "$(command)" ]]`, `func "$(command)"`, pipes, etc.
# shellcheck disable=SC2312

set -u

abort() {
  printf "%s\n" "$@" >&2
  exit 1
}

# Fail fast with a concise message when not using bash
# Single brackets are needed here for POSIX compatibility
# shellcheck disable=SC2292
if [ -z "${BASH_VERSION:-}" ]; then
  abort "Bash is required to interpret this script."
fi

# Check if script is run with force-interactive mode in CI
if [[ -n "${CI-}" && -n "${INTERACTIVE-}" ]]; then
  abort "Cannot run force-interactive mode in CI."
fi

# Check if both `INTERACTIVE` and `NONINTERACTIVE` are set
# Always use single-quoted strings with `exp` expressions
# shellcheck disable=SC2016
if [[ -n "${INTERACTIVE-}" && -n "${NONINTERACTIVE-}" ]]; then
  abort 'Both `$INTERACTIVE` and `$NONINTERACTIVE` are set. Please unset at least one variable and try again.'
fi

# Check if script is run in POSIX mode
if [[ -n "${POSIXLY_CORRECT+1}" ]]; then
  abort 'Bash must not run in POSIX mode. Please unset POSIXLY_CORRECT and try again.'
fi

# string formatters
if [[ -t 1 ]]; then
  tty_escape() { printf "\033[%sm" "$1"; }
else
  tty_escape() { :; }
fi
tty_mkbold() { tty_escape "1;$1"; }
tty_blue="$(tty_mkbold 34)"
tty_bold="$(tty_mkbold 39)"
tty_reset="$(tty_escape 0)"

shell_join() {
  local arg
  printf "%s" "$1"
  shift
  for arg in "$@"; do
    printf " "
    printf "%s" "${arg// /\ }"
  done
}

chomp() {
  printf "%s" "${1/"$'\n'"/}"
}

ohai() {
  printf "${tty_blue}==>${tty_bold} %s${tty_reset}\n" "$(shell_join "$@")"
}

ohai ""
ohai "========== git 설치 확인 =========="
ohai ""
git

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
ohai "========== ajou-print-on-air 프로젝트 복제 =========="
ohai ""
git clone https://github.com/khskeb0513/ajou-print-on-air

ohai ""
ohai "========== ajou-print-on-air 프로젝트 추가 =========="
ohai ""
cd ajou-print-on-air || exit
pm2 start && pm2 stop ajou-print-on-air

ohai ""
ohai "========== ajou-print-on-air 전화번호 입력 =========="
ohai ""
touch env.yml
echo -n "Phone number: " && read NICKNAME
echo "nickname: '$NICKNAME'" > env.yml

ohai ""
ohai "** 스크립트 끝 **"
