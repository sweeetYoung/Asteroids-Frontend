import { request } from "../utils/axios";

export async function getAllAsteroids() {
  return request({
    method: 'get',
    url: '/asteroids'
  })
}

export async function getOneAsteroid(asteroidId) {
  return request({
    method: 'get',
    url: `/asteroids/${asteroidId}`,
  })
}

export async function createOneAsteroid(params) {
  return request({
    method: 'post',
    url: `/asteroids`,
    data: params
  })
}

export async function updateOneAsteroid(asteroidId, params) {
  return request({
    method: 'put',
    url: `/asteroids/${asteroidId}`,
    data: params
  })
}

export async function deleteOneAsteroid(asteroidId) {
  return request({
    method: 'delete',
    url: `/asteroids/${asteroidId}`
  })
}

