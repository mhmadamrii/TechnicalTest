function nmr3(n) {
    if (n%2 !== 0) {
        for (let i = 0; i < n; i++) {
            console.log("\n")
            for (let j = 0; j < n; j++) {
                if (i == 0 || i == n - 1) {
                    if (j == 0 || j == ((n - 1) / 2) || j == n - 1) {
                        process.stdout.write("*" + " ");
                    }
                    else {
                        process.stdout.write("#" + " ");
                    }
                }
                else if (i == ((n - 1) / 2)) {
                    if (j == ((n - 1) / 2)) {
                        process.stdout.write("#" + " ");
                    }
                    else {
                        process.stdout.write("*" + " ");
                    }
                }
                else {
                    if (j == ((n - 1) / 2)) {
                        process.stdout.write("*" + " ");
                    }
                    else {
                        process.stdout.write("#" + " ");
                    }
                }
            }
        }
    }
    else {
        console.log("nmr3 tidak bisa di eksekusi")
    }
}

nmr3(13);