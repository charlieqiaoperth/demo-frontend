import axios from 'axios';

export function fetchAllHoles(fieldValue) {
    if (!fieldValue) {
        return axios
            .get('/holes', {})
            .then(response => {
                const data = response.data;
                return data;
            })
    }
}
export function fetchHoleById(id) {
    return axios
        .get(`/holes/${id}`)
        .then(response => {
            return response;
        })
}
