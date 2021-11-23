import * as React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {
  Container,
  Grid,
} from '@material-ui/core';


export default function AboutPhoto() {
  return (
    <Container maxWidth="lg" >
    <Grid
          item
          lg={8}
          md={12}
          xl={12}
          xs={12}
        >
    <ImageList lg={{ width: "90%", height: "100%" }} >
    {itemData.map((item) => (
      <ImageListItem key={item.img} >
        <img
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 3x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ))}
  </ImageList>
    </Grid>
    </Container>
  );
}

const itemData = [
  {
    img: 'https://res.cloudinary.com/dntepcqvn/image/upload/v1636766735/ECDIMA20140718_0002_1_fjgupo.jpg',
    title: 'Comedor',
  },
  {
    img:  'https://res.cloudinary.com/dntepcqvn/image/upload/v1637711531/12_e9pugs.png',
    title: 'chicos',
  },
 

];
