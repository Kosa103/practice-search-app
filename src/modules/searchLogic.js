export async function fetchSearchData() {
    const input = document.getElementById("search-input");

    if (input.value) {
        if (input.value.toUpperCase() === "FAIL") {
            return "ERROR";
        }

        const url = `https://gorest.co.in/public-api/users?name=${input.value}`;

        const data = await fetch(url).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                return res.json().then(errData => {
                    console.log("SERVER-SIDE ERROR:");
                    console.log(errData);
                    throw new Error("Server-side error!");
                });
            }
        }).catch(err => {
            console.log(err);
            throw new Error("Unknown error occured! Maybe there is a typo in the URL");
        });

        return data.data;
    } else {
        return null;
    }
}

export default fetchSearchData;
