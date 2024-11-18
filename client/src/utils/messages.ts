



export const maxLengthError = (max:number) =>{
    return `Input must be maximum ${max} characters.`
}

export const minLengthError = (min:number) =>{
    return `Input must be minimum ${min} characters.`
}

export const betweenLengthError = (max:number, min:number) =>{
    return `Input must be between ${min} and ${max} characters.`
}


export const emailInvalidError = () =>{
    return `Invalid email address. Please enter a valid email address.`
}


export const requiredError = "Input field is required."

