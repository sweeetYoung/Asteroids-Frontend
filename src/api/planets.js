import { request } from "../utils/axios";

export async function getAllPlanets() {
  return request({
    method: 'get',
    url: '/planets'
  })
}

export async function getOnePlanet(planetId) {
  return request({
    method: 'get',
    url: `/planets/${planetId}`,
  })
}

export async function createOnePlanet(params) {
  return request({
    method: 'post',
    url: `/planets`,
    data: params
  })
}

export async function updateOnePlanet(planetId, params) {
  console.log(params)
  return request({
    method: 'put',
    url: `/planets/${planetId}`,
    data: params
  })
}

export async function deleteOneAsteroid(planetId) {
  return request({
    method: 'delete',
    url: `/planets/${planetId}`
  })
}

