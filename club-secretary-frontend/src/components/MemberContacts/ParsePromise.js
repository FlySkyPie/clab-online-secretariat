import parse from "csv-parse";

const ParsePromise = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (event) => {
        const text = event.target.result;
        parse(text, {}, (err, output) => {
            if (err) {
                reject(err);
                return;
            }
            const list = output
                .map((item, index) => ({
                    id: index,
                    name: item[0],
                    email: item[1],
                }));
            resolve(list);
        });
    };

    reader.onerror = (event) => {
        reject(event);
    };
});


export default ParsePromise;