
const getCountryList = async () => {
      const list = await fetch("https://restcountries.com/v3.1/all");
      const data = list
            ?.json()
            .then((data) => {
                  return data;
            })
            .catch((error) => {
                  console.log("Error", error);
            });
      return data;
}

export {getCountryList}