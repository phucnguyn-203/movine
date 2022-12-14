import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase';
import MovieItem from '../../components/movieItem';
import Loading from '../../components/loading';
import { deleteDocument } from '../../firebase';

import './favorite.scss';

const Favorite = () => {
    const currentUser = useSelector((state) => state.user.userInfo);

    const [favoriteList, setFavoriteList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(database, 'favorite_movies'), where('userId', '==', currentUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const movies = [];
            querySnapshot.forEach((doc) => {
                movies.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setFavoriteList(movies);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDeleteMovie = async (id) => {
        try {
            await deleteDocument('favorite_movies', id);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid wide">
                    <div className="row" style={{ marginTop: 80, paddingLeft: 12, paddingRight: 12 }}>
                        {favoriteList.map((movie) => (
                            <div key={movie.id} className="col l-2-4 m-4 c-6">
                                <div className="movie__item-container">
                                    <MovieItem movie={movie.movieDetails} mediaType={movie.movieDetails.mediaType} />
                                    <button className="button" onClick={() => handleDeleteMovie(movie.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Favorite;
