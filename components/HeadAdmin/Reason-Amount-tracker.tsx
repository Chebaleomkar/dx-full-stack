'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, Trash2Icon, CheckIcon, XIcon, PencilIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useInstitution from '@/hooks/useInstitution'
import useUser from '@/hooks/useUser'
import axios from 'axios'
import { getToken } from '@/utils/getToken'

type Entry = {
  id?: string
  label: string
  value: string
  _id?: string;
}
const updateInstitutionFineItems = async (
  institutionId: string,
  fineItems: Entry[]
) => {

  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.put(`/api/institution/${institutionId}`, {  fineItems,} , {headers});
    sessionStorage.removeItem('institutionData');
    return response.data;
  } catch (error) {
    console.error("Error updating fine items:", error);
    throw error;
  }
};

export default function ReasonAmountTracker() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newLabel, setNewLabel] = useState('')
  const [newValue, setNewValue] = useState('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { institutionData,loading: institutionLoading,error: institutionError} = useInstitution();


  useEffect(() => {
    if (institutionData) {
      setEntries(institutionData.fineItems || []);
    }
  }, [institutionData])

  const handleApiUpdate = async (updatedEntries: Entry[]) => {
    if (!institutionData?._id) return;

    try {
      await updateInstitutionFineItems(institutionData?._id, updatedEntries);
      console.log("API updated successfully");
      setError(null);
    } catch (err) {
      console.error("API update failed:", err);
      setError("Failed to update institution");
    }
  };

  const addEntry = async () => {
    if (newLabel && newValue && entries.length < 10) {
      const newEntry: Entry = {
        id: Date.now().toString(),
        label: newLabel,
        value: newValue,
      };
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      setNewLabel("");
      setNewValue("");
      setIsAdding(false);
      console.log("Entry added:", newEntry);

      // Fire API request
      await handleApiUpdate(updatedEntries);
    }
  };

  const updateEntry = async (id: string) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, label: newLabel, value: newValue } : entry
    );
    setEntries(updatedEntries);
    setEditingId(null);
    setNewLabel("");
    setNewValue("");
    console.log("Entry updated:", id);

    // Fire API request
    await handleApiUpdate(updatedEntries);
  };

  const deleteEntry = async (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    console.log("Entry deleted:", id);

    // Fire API request
    await handleApiUpdate(updatedEntries);
  };

  const startEditing = (entry: any) => {
    setEditingId(entry.id)
    setNewLabel(entry.label)
    setNewValue(entry.value)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setNewLabel('')
    setNewValue('')
  }

  const startAdding = () => {
    if (entries.length < 10) {
      setIsAdding(true)
      setEditingId(null)
      setNewLabel('')
      setNewValue('')
    }
  }

  const cancelAdding = () => {
    setIsAdding(false)
    setNewLabel('')
    setNewValue('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Reason and Amount Tracker</h2>
      
      {entries?.map((entry:any) => (
        <div key={entry.id} className="flex space-x-2">
          {editingId === entry?.id ? (
            <>
              <Input
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Reason"
                className="flex-1"
              />
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Amount"
                type="number"
                className="flex-1"
              />
              <Button
                onClick={() => updateEntry(entry.id)}
                variant="outline"
                className="shrink-0"
                disabled={!newLabel || !newValue}
              >
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">Confirm update</span>
              </Button>
              <Button
                onClick={cancelEditing}
                variant="ghost"
                className="shrink-0"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Cancel update</span>
              </Button>
            </>
          ) : (
            <>
              <Input
                value={entry.label}
                readOnly
                className="flex-1"
              />
              <Input
                value={entry.value}
                readOnly
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startEditing(entry)}
                className="shrink-0"
              >
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit entry</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteEntry(entry.id)}
                className="shrink-0"
              >
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">Delete entry</span>
              </Button>
            </>
          )}
        </div>
      ))}
      
      {isAdding && (
        <div className="flex space-x-2">
          <Input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Reason"
            className="flex-1"
          />
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Amount"
            type="number"
            className="flex-1"
          />
          <Button
            onClick={addEntry}
            variant="outline"
            className="shrink-0"
            disabled={!newLabel || !newValue}
          >
            <CheckIcon className="h-4 w-4" />
            <span className="sr-only">Confirm new entry</span>
          </Button>
          <Button
            onClick={cancelAdding}
            variant="ghost"
            className="shrink-0"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cancel new entry</span>
          </Button>
        </div>
      )}
      
      {!isAdding && entries?.length < 10 && (
        <Button
          onClick={startAdding}
          variant="outline"
          className="w-full"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Entry
        </Button>
      )}
      
      {entries?.length >= 10 && (
        <p className="text-sm text-muted-foreground">
          Maximum of 10 entries reached.
        </p>
      )}
    </div>
  )
}