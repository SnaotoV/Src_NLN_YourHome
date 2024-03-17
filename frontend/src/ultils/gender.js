export const genderList = [
    { genderId: 0, gender: 'Nữ' },
    { genderId: 1, gender: 'Nam' },
    { genderId: 2, gender: 'Khác' },
]

export const getGender = (code) => {
    for (let i = 0; i < genderList.length; i++) {
        if (Number(code) === genderList[i].genderId) {
            return genderList[i].gender;
        }
    }
}