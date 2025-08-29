const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Clean Sequential Thinking MCP Server Running',
    version: '1.0.0',
    service: 'AI Coaching Platform',
    endpoints: {
      health: '/',
      tools: '/tools/sequentialthinking_tools'
    }
  });
});

// Sequential thinking tool endpoint
app.post('/tools/sequentialthinking_tools', async (req, res) => {
  try {
    const { 
      thought, 
      next_thought_needed = true, 
      thought_number = 1, 
      total_thoughts = 3,
      context = {},
      user_message = ''
    } = req.body;

    console.log(`Processing thought ${thought_number}/${total_thoughts}: ${thought}`);

    // Generate sequential analysis based on thought number
    const analysis = await generateSequentialAnalysis({
      thought,
      thought_number,
      total_thoughts,
      context,
      user_message
    });

    const response = {
      success: true,
      thought_number: thought_number,
      total_thoughts: total_thoughts,
      next_thought_needed: thought_number < total_thoughts,
      analysis: analysis,
      reasoning_step: `Step ${thought_number}: ${getStepDescription(thought_number)}`,
      timestamp: new Date().toISOString()
    };

    res.json(response);

  } catch (error) {
    console.error('Sequential thinking error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      thought_number: req.body.thought_number || 1
    });
  }
});

// Generate sequential analysis based on step
async function generateSequentialAnalysis({ thought, thought_number, total_thoughts, context, user_message }) {
  
  let analysis = '';
  
  switch (thought_number) {
    case 1:
      analysis = generateSafetyAssessment(thought, user_message);
      break;
    case 2:
      analysis = generateFrameworkSelection(thought, context);
      break;
    case 3:
      analysis = generateResponsePlanning(thought, context);
      break;
    default:
      analysis = generateGeneralAnalysis(thought, thought_number);
  }
  
  return analysis;
}

// Step 1: Safety Assessment
function generateSafetyAssessment(thought, user_message) {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'hurt myself', 'not worth living',
    'better off dead', 'want to die', 'no point', 'give up', 'hopeless'
  ];
  
  const messageText = (user_message || thought || '').toLowerCase();
  const hasCrisisIndicators = crisisKeywords.some(keyword => messageText.includes(keyword));
  
  let assessment = "STEP 1: SAFETY ASSESSMENT\n";
  assessment += "========================================\n\n";
  
  assessment += "Crisis Screening:\n";
  if (hasCrisisIndicators) {
    assessment += "🚨 CRISIS INDICATORS DETECTED\n";
    assessment += "- Immediate safety assessment required\n";
    assessment += "- Crisis intervention protocols activated\n";
    assessment += "- Professional support may be needed\n\n";
    
    assessment += "Immediate Actions:\n";
    assessment += "- Provide crisis resources (988 Suicide Lifeline)\n";
    assessment += "- Validate feelings while ensuring safety\n";
    assessment += "- Encourage professional help\n";
    assessment += "- Follow up within 24 hours\n\n";
  } else {
    assessment += "✅ No immediate crisis indicators detected\n";
    assessment += "- Safe to proceed with standard grief coaching\n";
    assessment += "- Continue with empathetic support\n";
    assessment += "- Monitor for changes in risk level\n\n";
  }
  
  assessment += "Emotional State Analysis:\n";
  if (messageText.includes('angry') || messageText.includes('mad')) {
    assessment += "- Anger phase of grief identified\n";
  }
  if (messageText.includes('sad') || messageText.includes('depressed')) {
    assessment += "- Sadness/depression indicators present\n";
  }
  if (messageText.includes('numb') || messageText.includes('empty')) {
    assessment += "- Emotional numbness detected\n";
  }
  if (messageText.includes('guilt') || messageText.includes('blame')) {
    assessment += "- Guilt/self-blame patterns identified\n";
  }
  
  assessment += "\nRecommendation: " + (hasCrisisIndicators ? "CRISIS PROTOCOL" : "STANDARD GRIEF SUPPORT");
  
  return assessment;
}

// Step 2: Framework Selection
function generateFrameworkSelection(thought, context) {
  let selection = "STEP 2: THERAPEUTIC FRAMEWORK SELECTION\n";
  selection += "========================================\n\n";
  
  selection += "Available Evidence-Based Frameworks:\n\n";
  
  selection += "1. TRAUMA-INFORMED GRIEF THERAPY\n";
  selection += "   - Best for: Sudden, unexpected loss\n";
  selection += "   - Techniques: Grounding, safety, gradual exposure\n";
  selection += "   - Focus: Stabilization before processing\n\n";
  
  selection += "2. CONTINUING BONDS MODEL\n";
  selection += "   - Best for: Maintaining connection with deceased\n";
  selection += "   - Techniques: Memory work, rituals, meaning-making\n";
  selection += "   - Focus: Healthy ongoing relationship\n\n";
  
  selection += "3. COGNITIVE BEHAVIORAL THERAPY (CBT)\n";
  selection += "   - Best for: Complicated grief, negative thought patterns\n";
  selection += "   - Techniques: Thought challenging, behavioral activation\n";
  selection += "   - Focus: Changing unhelpful thinking patterns\n\n";
  
  selection += "4. ACCEPTANCE AND COMMITMENT THERAPY (ACT)\n";
  selection += "   - Best for: Values-based living despite loss\n";
  selection += "   - Techniques: Mindfulness, values clarification\n";
  selection += "   - Focus: Psychological flexibility\n\n";
  
  selection += "RECOMMENDED APPROACH:\n";
  selection += "Primary: Trauma-Informed Grief Therapy\n";
  selection += "Secondary: Continuing Bonds Model\n";
  selection += "Rationale: Provides safety foundation while honoring connection\n\n";
  
  selection += "Cultural Considerations:\n";
  selection += "- Respect cultural grief expressions\n";
  selection += "- Consider spiritual/religious beliefs\n";
  selection += "- Adapt techniques to cultural context\n";
  
  return selection;
}

// Step 3: Response Planning
function generateResponsePlanning(thought, context) {
  let planning = "STEP 3: PERSONALIZED RESPONSE PLANNING\n";
  planning += "========================================\n\n";
  
  planning += "Response Strategy:\n\n";
  
  planning += "1. EMPATHETIC VALIDATION\n";
  planning += "   - Acknowledge the depth of their pain\n";
  planning += "   - Normalize grief responses\n";
  planning += "   - Validate their unique experience\n\n";
  
  planning += "2. PSYCHOEDUCATION\n";
  planning += "   - Explain grief as natural process\n";
  planning += "   - Describe common grief reactions\n";
  planning += "   - Provide hope for healing\n\n";
  
  planning += "3. PRACTICAL COPING STRATEGIES\n";
  planning += "   - Grounding techniques for overwhelming emotions\n";
  planning += "   - Self-care recommendations\n";
  planning += "   - Gradual re-engagement activities\n\n";
  
  planning += "4. MEANING-MAKING OPPORTUNITIES\n";
  planning += "   - Honor the relationship with deceased\n";
  planning += "   - Explore legacy and memories\n";
  planning += "   - Consider ways to maintain connection\n\n";
  
  planning += "5. RESOURCE PROVISION\n";
  planning += "   - Grief support groups\n";
  planning += "   - Professional counseling options\n";
  planning += "   - Crisis resources if needed\n\n";
  
  planning += "Tone and Approach:\n";
  planning += "- Warm, compassionate, non-judgmental\n";
  planning += "- Patient and allowing for their pace\n";
  planning += "- Hopeful while acknowledging pain\n";
  planning += "- Professional yet personal\n\n";
  
  planning += "Follow-up Plan:\n";
  planning += "- Check in within 24-48 hours\n";
  planning += "- Monitor progress and adjust approach\n";
  planning += "- Provide ongoing support and resources\n";
  
  return planning;
}

// General analysis for additional steps
function generateGeneralAnalysis(thought, thought_number) {
  return `STEP ${thought_number}: ADDITIONAL ANALYSIS\n` +
         "========================================\n\n" +
         `Continuing analysis: ${thought}\n\n` +
         "This step provides additional depth to the grief coaching analysis,\n" +
         "ensuring comprehensive understanding and appropriate response.";
}

// Get step description
function getStepDescription(step_number) {
  const descriptions = {
    1: "Safety Assessment & Crisis Screening",
    2: "Therapeutic Framework Selection", 
    3: "Personalized Response Planning",
    4: "Additional Analysis & Refinement"
  };
  
  return descriptions[step_number] || `Analysis Step ${step_number}`;
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Sequential thinking processing failed'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Clean Sequential Thinking MCP Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/`);
  console.log(`Tools endpoint: http://localhost:${PORT}/tools/sequentialthinking_tools`);
  console.log('Server ready for AI coaching platform integration');
});

module.exports = app;
