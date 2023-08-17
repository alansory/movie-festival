import { ref } from "vue";
import { supabase } from "./init";

export const fetchMovieLists = async () => {
  const data = ref([]); // Create a reactive ref for your fetched data
  try {
    const { data: movies, error } = await supabase.from("movie").select("*").order('id', { ascending: true });
    if (error) {
      throw error;
    }
    // Assign the fetched data to the reactive ref
    data.value = movies;
  } catch (error) {
    console.warn(error.message);
  }

  return data; // Return the reactive ref to use in your component
};

export const fetchTrandingLists = async () => {
  const data = ref([]); 
  try {
    const { data: movies, error } = await supabase.from("movie").select("*").order('view_count', { ascending: false });
    if (error) {
      throw error;
    }
    data.value = movies;
  } catch (error) {
    console.warn(error.message);
  }

  return data; 
};


export const searchMovie = async (q) => {
  const data = ref({});
  try {
    const { data: movies, error } = await supabase.from("movie").select("*")
    .or(`or(title.ilike.%${q}%,overview.ilike.%${q}%),or(genre.ilike.%${q}%,artist.ilike.%${q}%)`);
    if (error) {
      throw error;
    }
    data.value = movies;
  } catch (error) {
    console.warn(error.message);
  }
  return data;
};

export const fetchMovieDetail = async (id) => {
  const data = ref({});
  try {
    const { data: movies, error } = await supabase.from("movie").select("*").eq("id", id).single();
    if (error) {
      throw error;
    }
    data.value = movies;
  } catch (error) {
    console.warn(error.message);
  }
  return data;
};

export const updateMovie = async (id, payload) => {
  const data = ref({});
  try {
    const { data: movies, error } = await supabase.from("movie").update(payload).eq("id", id);
    if (error) {
      throw error;
    }
    data.value = movies[0];
  } catch (error) {
    console.warn(error.message);
  }
  return data;
};




