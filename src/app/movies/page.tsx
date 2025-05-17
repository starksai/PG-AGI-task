"use client";
import { fetchTrendingMovies } from "@/services/MoviesService";
import { useEffect, useState } from "react"

export default function MoviesDashboard() {
    const [movieData, setMovieData] = useState<any>(null);


    useEffect(() => {
        async function getData() {
            let res = await fetchTrendingMovies();
            console.log(res);
            
            setMovieData(res)

        }

        getData();

    }, [])

    // console.log(movieData);
    

    return (
        <div>
            nnnn
        </div>
    )
}