import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import instance from '@/services/api/axios.ts';
import { ApiResponse } from '@/types';

interface AxiosRequestConfig<T> {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: T;
}

interface AxiosState<T> {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
}

function useAxios<T>(
  config: AxiosRequestConfig<T>,
): AxiosState<ApiResponse<T>> {
  const [state, setState] = useState<AxiosState<ApiResponse<T>>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ data: null, error: null, loading: true });
      try {
        const response = await instance({
          url: config.url,
          method: config.method,
          data: config.data,
        });
        setState({ data: response.data, error: null, loading: false });
      } catch (error) {
        setState({
          data: null,
          error: axios.isAxiosError(error) ? (error as AxiosError<T>) : null,
          loading: false,
        });
      }
    };

    fetchData();
  }, [config.url, config.method, config.data]);

  return state;
}

export default useAxios;
