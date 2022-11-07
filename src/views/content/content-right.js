import mapBackgroundImg from '../../assets/background.png'
import planet1 from '../../assets/planet-03.png'
import planet2 from '../../assets/planet-11.png'
import planet3 from '../../assets/planet-12.png'
import asteroidImg from '../../assets/astroid.png'
import '../../assets/content-right.scss'

const AsteroidsMap = ({currentYear, miners, planets, asteroids}) => {
  console.log('$$$$$$', planets)
  const asteroidsImgList = asteroids.reduce((prev, curv) => {
    prev.push({x: curv.position.x, y: curv.position.y})
    return prev
  }, [])
  console.log(asteroidsImgList)
  return (
    <div className='miner-map'>
      <p style={{color: '#FFFFFF'}}>{currentYear} YEARS</p>
      {/*<img src={mapBackgroundImg} alt={mapBackgroundImg} />*/}
      <div className='miner-grid'>
        <img
          className='planet1'
          style={{
            gridColumn: `${planets[0]?.position.x - 1} / ${planets[0]?.position.x}`,
            gridRow: `${planets[0]?.position.y - 1} / ${planets[0]?.position.y}`
          }}
          src={planet1}
          alt={planet1}/>
        <p>1080/1000</p>
        <img
          className='planet2'
          style={{
            gridColumn: `${planets[1]?.position.x - 1} / ${planets[1]?.position.x }`,
            gridRow: `${planets[1]?.position.y - 1} / ${planets[1]?.position.y}`
          }}
          src={planet2} alt={planet2}/>
        <img
          className='planet3'
          style={{
            gridColumn: `${planets[2]?.position.x - 1} / ${planets[2]?.position.x}`,
            gridRow: `${planets[2]?.position.y - 1} / ${planets[2]?.position.y}`
          }}
          src={planet3} alt={planet3}/>
        {
          asteroidsImgList.map((asteroid, index) => {
            return <img
              className='asteroid-img'
              style={{
                gridColumn: `${asteroid.x - 25} / ${asteroid.x + 25}`,
                gridRow: `${asteroid.y - 25} / ${asteroid.y + 25}`
              }}
              src={asteroidImg}
              alt={asteroidImg}
            />
          })
        }
      </div>
    </div>
  )
}

export default AsteroidsMap
