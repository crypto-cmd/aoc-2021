# Define colors to be used in output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
spinner(){
    local pid=$!
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

# Compile Typescript files and check if compilation was successful
printf "${NC}Compiling Typescript files...${NC}\n"
eval "tsc --project ./tsconfig.json" & spinner
# clear
if [ $? -eq 0 ]; then
    printf "${GREEN}Typescript compiled successfully!${NC}\n"
    python3 ./runner.py $1
else
    printf "${RED}Typescript compilation failed!${NC}\n"
    exit 1
fi
