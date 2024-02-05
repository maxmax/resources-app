import * as React from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

interface BasicCardProps {
  date?: string;
  title?: string;
  author?: string;
  content?: string;
  link?: string;
  linkText?: string;
}

const BasicCard: React.FC<BasicCardProps> = ({
  date,
  title,
  author,
  content,
  link,
  linkText
}) => {

  return (
    <Card>
      <CardContent>
        {date &&
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dayjs(date).format('DD MMM YYYY')}
          </Typography>
        }
        {title &&
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        }
        {author &&
          <Typography color="text.secondary">
            {author}
          </Typography>
        }
        {content &&
          <Typography sx={{ mt: 1.5 }} variant="body2">
            {content}
          </Typography>
        }
      </CardContent>
      {link && linkText &&
        <CardActions>
          <Link to={link}>
            <Button size="small">{linkText}</Button>
          </Link>
        </CardActions>
      }
    </Card>
  );
}

export default BasicCard;
