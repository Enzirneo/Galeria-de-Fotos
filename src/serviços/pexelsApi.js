import axios from 'axios';

const API_KEY = 'ZY1yqv5DynMBY9BRgGsaGE9ydBOgaiWgfS6oqA0FeerOmOjURwdH9sF5';
const BASE_URL = 'https://api.pexels.com/v1';

// Função para buscar e adaptar as fotos da API para o formato da aplicação
export const searchPhotos = async (query = 'nature', perPage = 32) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query,
        per_page: perPage,
      },
    });

    const adaptedPhotos = response.data.photos.map((photo, i) => ({
      id: photo.id,
      title: photo.photographer || "Sem autor",
      category: query,
      url: photo.src?.medium || photo.src?.original || "https://via.placeholder.com/500",
      date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0], // datas diferentes
    }));

    return adaptedPhotos;
  } catch (error) {
    console.error("Erro ao buscar fotos do Pexels:", error);
    return [];
  }
};
