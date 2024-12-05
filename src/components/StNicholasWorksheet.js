import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Define vocabulary pairs first
const vocabularyPairs = [
  { en: "bishop", pl: "biskup" },
  { en: "street", pl: "ulica" },
  { en: "sister", pl: "siostra" },
  { en: "gift", pl: "prezent" },
  { en: "gold", pl: "złoto" },
  { en: "window", pl: "okno" },
  { en: "morning", pl: "rano" },
  { en: "evening", pl: "wieczór" },
  { en: "happy", pl: "szczęśliwy" },
  { en: "sad", pl: "smutny" }
];

// Rest of your component code...

export default StNicholasWorksheet;