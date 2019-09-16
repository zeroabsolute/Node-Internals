const NS_PER_SEC = 1e9;
const start = process.hrtime();

for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        const end = process.hrtime(start);

        console.log(`Callback executed after ${end[0] * NS_PER_SEC + end[1]} ns`);
    }, 1000);
}