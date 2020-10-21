import React, { useState, useEffect } from 'react';

import EstablishmentService from '../../services/establishment_service';
import noPhoto from '../../images/no_photo.jpg';
import { LeftBar, Title, Paragraph, Image } from './styles';

const Establisment = (props) => {
  const [establishment, setEstablishment] = useState({});
  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() => {
    getEstablishmentInformations();
  }, [props.place]);

  async function getEstablishmentInformations() {
    try {
      const response = await EstablishmentService.show(props.place.place_id);
      setEstablishment(response.data.result);
    } catch (error) {
      setEstablishment([]);
    }
  }

  return (
    <LeftBar>
      {establishment.photos ? (
        <Image
          src={`
           https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&
             photoreference=${establishment.photos[0].photo_reference}&sensor=false&
             key=${REACT_APP_GOOGLE_API_KEY}`}
          alt="Store perfil"
        />
      ) : (
        <Image src={noPhoto} alt="No perfil" />
      )}
      <Title>{establishment.name}</Title>
      {establishment.opening_hours ? (
        <div>
          {establishment.opening_hours.open_now === true ? 'Aberto' : 'Fechado'}
          ​
          <hr />​
          {establishment.opening_hours.weekday_text.map((schedule, index) => {
            return <Paragraph key={index}>{schedule}</Paragraph>;
          })}
        </div>
      ) : (
        'Não há cadastros de horário de funcionamento.'
      )}
      <hr />​<Paragraph>{establishment.formatted_address}</Paragraph>
    </LeftBar>
  );
};

export default Establisment;
