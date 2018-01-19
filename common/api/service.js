import { get } from 'axios'
import { config } from '../../config';
const headers = { headers: { plugin: 'ANIME_FLV' }}
export default class Service {
    static Search(str) {
        return get(`${config.API}/search/${str}`, headers)
    }
    static GetEpisodes(show) {
        return get(`${config.API}/episodes/${show}`, headers)
    }
    static GetVideo(link) {
        return get(`${config.API}/view/${link}`, headers);
    }
    static GetRecentRelease(){
        return get(`${config.API}/last/episodes`, headers)
    }
}