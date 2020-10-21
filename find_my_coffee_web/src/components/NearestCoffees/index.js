import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';

import StoreService from '../../services/store';

import {
  RightBar,
  Head,
  Body,
  Footer,
  EstablishmentItem,
  Title,
  Paragraph,
} from './styles';

const NearestCoffees = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNearstStores();
  }, [props.latitude]);
  async function loadNearstStores() {
    const response = await StoreService.index(props.latitude, props.longitude);
    setStores(response.data);
  }

  return (
    <RightBar>
      <Head>
        <h3>Find My Coffee</h3>
      </Head>
      ​
      <Body>
        <strong>Mais amados na região</strong>
        <hr />
        {stores.map((store) => {
          return (
            <EstablishmentItem key={store.name}>
              <Title>{store.name}</Title>​<Paragraph>{store.address}</Paragraph>
              ​{store.ratings_count || 0} Opiniões
              <ReactStars edit={false} value={store.ratings_average || 0} />
              <hr />
            </EstablishmentItem>
          );
        })}
      </Body>
      ​
      <Footer>
        <h2>OneBitCode.com</h2>
        <Paragraph>
          Projeto Open Source desenvolvido na Semana Super Full Stack da escola
          online de programação
        </Paragraph>
      </Footer>
    </RightBar>
  );
};

export default NearestCoffees;
