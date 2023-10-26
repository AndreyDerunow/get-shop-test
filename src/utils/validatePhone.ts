async function validatePhone(phone: string) {
    try {
        const response = await fetch(
            `http://apilayer.net/api/validate?access_key=7854df83101a93ddffeb22ddcc77bfec&number=${phone.slice(
                2,
                12
            )}& country_code=RU&format=1`
        );
        const resParsed = await response.json();
        return resParsed.valid;
    } catch (error) {
        console.error(error);
    }
}

export default validatePhone;
