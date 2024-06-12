import { useEffect, useState } from 'react';
import axios from 'axios';
import { decodeEntities } from '../utils/decodeEntities';
import Header from '../Components/Header.jsx';

const VideoPage = () => {
    const [videos, setVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loading, setLoading] = useState(false);

    // Define the API URL based on the environment
    const API_URL = import.meta.env.PROD
        ? 'https://dakota-tube-api-production.up.railway.app/api/videos'
        : '/api/videos';

    const fetchVideos = async (pageToken = '') => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL, {
                params: {
                    pageToken
                }
            });

            setVideos((prevVideos) => {
                const newVideos = response.data.items.filter(
                    (video) => !prevVideos.some((v) => v.id.videoId === video.id.videoId)
                );
                return [...prevVideos, ...newVideos];
            });

            setNextPageToken(response.data.nextPageToken);
        } catch (error) {
            console.error('Error fetching videos', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const loadMore = () => {
        if (nextPageToken && !loading) {
            fetchVideos(nextPageToken);
        }
    };

    return (
        <>
            <Header />
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {videos.map((video) => (
                        <div key={video.id.videoId} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}
                                     className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{decodeEntities(video.snippet.title)}</h2>
                                <p>{decodeEntities(video.snippet.description)}</p>
                                <div className="card-actions justify-end">
                                    <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank"
                                       rel="noopener noreferrer" className="btn btn-primary">Watch</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {nextPageToken && (
                    <div className="flex justify-center mt-4">
                        <button className="btn btn-secondary" onClick={loadMore} disabled={loading}>
                            {loading ? 'Loading...' : 'Load More'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default VideoPage;
