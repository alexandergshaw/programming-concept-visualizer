import CodeSnippet from '../../common/CodeSnippet';
import { useState, useEffect } from 'react';

export default function JQueryInclusionMethods() {
  const [loadingDemo, setLoadingDemo] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loadingDemo) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          // CDN loads faster than local
          return prev + (loadingDemo === 'cdn' ? 4 : 2);
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [loadingDemo]);

  return (
    <div className="space-y-4">
      <p>
        Before you can use jQuery, you need to add it to your webpage. Here are two easy ways to do this:
      </p>

      <h3 className="text-xl font-semibold mt-4">1. Quick Way: Use a CDN Link</h3>
      <p>
        The fastest way is to copy-paste a link to jQuery from a CDN (a special website that delivers code quickly).
        This method is:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Fast - loads quickly for your users</li>
        <li>Easy - just copy and paste one line</li>
        <li>Reliable - big companies maintain these links</li>
      </ul>

      <p className="font-semibold mt-4">Copy this line (Google's CDN):</p>
      <CodeSnippet
        lines={[
          { code: '<!-- Put these lines in your HTML file\'s <head> section -->' },

          { code: '' },
          { code: '<!-- First: Include jQuery -->' },
          { code: '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>' },
          { code: '<!-- Then: Include your JavaScript file -->' },
          { code: '<script src="js/your-script.js"></script>' },
          { code: '' },
          { code: '<!-- If you see "$ is not defined" error, check if jQuery is loaded before your code! -->' },
          { code: '' },
        ]}
        language="javascript"
      />

      <h3 className="text-xl font-semibold mt-6">2. Download Way: Keep jQuery on Your Website</h3>
      <p>
        You can also download jQuery and keep it with your website files. This way:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Your site works even if the CDN is down</li>
        <li>You control which version of jQuery you use</li>
        <li>jQuery loads from your own server</li>
      </ul>

      <ol className="list-decimal pl-6 space-y-2">
        <li>Download jQuery from <a href="https://jquery.com/download/" className="text-blue-500 hover:underline">jquery.com/download</a></li>
        <li>Put the file in your website's folder</li>
        <li>Add this line to your HTML:</li>
      </ol>

      <CodeSnippet
        lines={[
          { code: '<!-- Put these lines in your HTML file\'s <head> section -->' },
          { code: '<!-- First: Include jQuery -->' },
          { code: '<script src="js/jquery-3.7.1.min.js"></script>' },
          { code: '<!-- Then: Include your JavaScript file -->' },
          { code: '<script src="js/your-script.js"></script>' },
          { code: ' ' },
          { code: '<!-- If you see "$ is not defined" error, check if jQuery is loaded before your code! -->' },
        ]}
        language="javascript"
      />

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
        <p className="text-yellow-700">
          <strong>Important:</strong> Always put jQuery before your own JavaScript code. This makes sure
          jQuery is ready before your code tries to use it. You can put the script tags either in the head
          section (as shown above) or at the end of the body tag - just make sure jQuery comes first!
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
        <p className="text-yellow-700">
          <strong>Quick tip:</strong> For most websites, using the CDN link (first method) is the best choice. It's simple
          and fast.
        </p>
      </div>

    </div>
  );
} 