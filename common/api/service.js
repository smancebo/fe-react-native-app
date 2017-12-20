import { get } from 'axios'
import { config } from '../../config';

export default class Service {
    static Search(str) {
        return get(`${config.API}/search/${str}`)
    }
    static GetEpisodes(show) {
        return get(`${config.API}/episodes/${show}`)
    }
}