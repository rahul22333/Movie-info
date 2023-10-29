import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"

const AllCards = ({ image, title, lang, rate, id, type }) => {
  const navigate = useNavigate()
  const handleCard = (type) => {
    navigate(`/movieinfo/${id}`, { state: { type } })
  }
  return (<>
    <Grid item xs={12} sm={6} md={3} >
      <div className="all-card" onClick={() => handleCard(type)}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: '96.25%',
            }}
            image={image ? `https://image.tmdb.org/t/p/w200/${image}` : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {title.length > 15 ? title.slice(0, 10) : title}
            </Typography>
            <Typography>
              {lang ? lang === "en" ? 'English Movie' : 'Original Movie' : "Original Movie"}
            </Typography>
            <Typography>
              {rate ? rate : ""}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  </>)
}
export default AllCards
