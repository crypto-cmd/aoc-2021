import os
import sys
import subprocess
from datetime import date


day = int(sys.argv[1] if len(sys.argv) > 1 else date.today().day)
# Ensure day is written with two digits
if day < 10:
    day = "0" + str(day)

# Print the day
print("Day: " + str(day))

# Get part1 aand part2 files
folder = "./dist/day" + str(day)
part1 = folder + "/part1.js"
part2 = folder + "/part2.js"

# Check if part1 files path exist
if not subprocess.call(
    ["ls", part1], stdout=open(os.devnull, "w"), stderr=subprocess.STDOUT
):
    # Run part1
    print("Running part1:")
    subprocess.call(["node", part1])
else:
    print("No part1 file found")

if not subprocess.call(
    ["ls", part2], stdout=open(os.devnull, "w"), stderr=subprocess.STDOUT
):
    print("Running part2:")
    # Run part2
    subprocess.call(["node", part2])
else:
    print("No part2 file found")
