import React, { useState } from 'react'
import HeroComponent from '../../components/User/HeroComponent'
import SpecialityComponent from '../../components/User/SpecialityComponent'
import SectionTitle from '../../components/User/SectionTitle'
import DishesComponent from '../../components/User/DishesComponent'
import { speciality, instructions } from '../../Service/User'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/User/LoadingComponent'

const HomePage = () => {

  const recommendations = useSelector(state => state.Dish.Dishes);
  const dishLoad = useSelector(state => state.loading.dishLoading);

  return (
    <>
      <main className='main'>
        <section id='heroSection'>
          <HeroComponent />
        </section>

        <section id='Specialities' className='section'>
          <SectionTitle title={'What We Provide'} />
          <div className="specialityContainer">
            {
              speciality.map((currElem, index) => {
                const { img, title, description } = currElem;
                return (
                  <SpecialityComponent
                    img={img}
                    title={title}
                    description={description}
                    key={index}
                  />
                )
              })
            }
          </div>
        </section>

        <section id='Recommendations' className='section'>
          <SectionTitle title={'Our Recommended Dishes'} />
          <div className='dishContainer'>
            {

              dishLoad ? <LoadingComponent size={4}/> :
                recommendations && recommendations.slice(0, 4).map((currElem, index) => {
                  const { file, dishName, type } = currElem;
                  return (
                    <DishesComponent
                      file={file}
                      dishName={dishName}
                      type={type}
                      key={index}
                    />
                  )
                })
            }
          </div>
        </section>

        <section id='Scan' className='section'>
          <SectionTitle title={'Scan The Qr On Your Table'} title2="To Place The Order" />
          {
            instructions.map((currElem, index) => {
              const { img, title, description } = currElem;
              const { l1, l2 } = description;
              return (
                <SpecialityComponent
                  img={img}
                  title={title}
                  l1={l1}
                  l2={l2}
                  key={index}
                />
              )
            })
          }
        </section>

      </main>
    </>
  )
}

export default HomePage
