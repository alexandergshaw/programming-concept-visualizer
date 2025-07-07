import CodeSnippet from '../../common/CodeSnippet';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

export default function JQueryInclusionMethods() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="body2">
        Before you can use jQuery, you need to include it in your webpage. There are two main ways to do this:
      </Typography>

      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          1. Download and Host Locally
        </Typography>
        <Typography variant="body2" paragraph>
          Download jQuery from <Link href="https://jquery.com/download/" target="_blank" rel="noopener">jquery.com</Link> and 
          save it in your project. Then link to it like this:
        </Typography>
        <CodeSnippet
          lines={[
            { code: '<script src="path/to/jquery.min.js"></script>' }
          ]}
          language="javascript"
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          2. Use a CDN (Content Delivery Network)
        </Typography>
        <Typography variant="body2" paragraph>
          Add this line to your HTML to load jQuery from a CDN:
        </Typography>
        <CodeSnippet
          lines={[
            { code: '<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>' }
          ]}
          language="javascript"
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Important Tips
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2">Always put jQuery script tags near the end of your body tag</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">This helps your page load faster</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2">Make sure jQuery loads before any scripts that use it</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">Your code won&apos;t work if it tries to use jQuery before it&apos;s loaded</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2">Use the minified version (.min.js) in production</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">It&apos;s smaller and loads faster</Typography>}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
} 