export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agent_applications: {
        Row: {
          created_at: string
          email: string
          experience: string | null
          full_name: string
          id: string
          id_document_url: string | null
          location: string | null
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          phone: string
          status: Database["public"]["Enums"]["agent_app_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          experience?: string | null
          full_name: string
          id?: string
          id_document_url?: string | null
          location?: string | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone: string
          status?: Database["public"]["Enums"]["agent_app_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string | null
          full_name?: string
          id?: string
          id_document_url?: string | null
          location?: string | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone?: string
          status?: Database["public"]["Enums"]["agent_app_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      agent_reviews: {
        Row: {
          agent_id: string
          comment: string | null
          created_at: string
          id: string
          property_id: string | null
          rating: number
          user_id: string
        }
        Insert: {
          agent_id: string
          comment?: string | null
          created_at?: string
          id?: string
          property_id?: string | null
          rating: number
          user_id: string
        }
        Update: {
          agent_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          property_id?: string | null
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_reviews_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          id: string
          image: string | null
          joined_date: string
          languages: string[] | null
          listings_count: number
          location: string | null
          name: string
          phone: string | null
          rating: number
          response_time: string | null
          reviews_count: number
          speciality: string | null
          updated_at: string
          user_id: string
          verified: boolean
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image?: string | null
          joined_date?: string
          languages?: string[] | null
          listings_count?: number
          location?: string | null
          name: string
          phone?: string | null
          rating?: number
          response_time?: string | null
          reviews_count?: number
          speciality?: string | null
          updated_at?: string
          user_id: string
          verified?: boolean
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          image?: string | null
          joined_date?: string
          languages?: string[] | null
          listings_count?: number
          location?: string | null
          name?: string
          phone?: string | null
          rating?: number
          response_time?: string | null
          reviews_count?: number
          speciality?: string | null
          updated_at?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: []
      }
      bookings: {
        Row: {
          agent_id: string | null
          check_in: string
          check_out: string
          created_at: string
          guests: number
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          property_id: string
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          check_in: string
          check_out: string
          created_at?: string
          guests?: number
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          property_id: string
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_price?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_id?: string | null
          check_in?: string
          check_out?: string
          created_at?: string
          guests?: number
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          property_id?: string
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          last_message: string | null
          last_message_at: string | null
          participant_one: string
          participant_two: string
          property_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          participant_one: string
          participant_two: string
          property_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          participant_one?: string
          participant_two?: string
          property_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read: boolean
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          agent_id: string | null
          availability: Json | null
          available_from: string | null
          bathrooms: number
          bedrooms: number
          cancellation_policy:
            | Database["public"]["Enums"]["cancellation_policy"]
            | null
          check_in_time: string | null
          check_out_time: string | null
          cleaning_fee: number | null
          created_at: string
          daily_price: number | null
          deposit: number | null
          description: string | null
          full_address: string | null
          furnished: boolean
          id: string
          images: string[]
          instant_book: boolean
          is_new: boolean
          latitude: number | null
          lease_term: string | null
          location: string
          longitude: number | null
          max_guests: number | null
          minimum_stay: number | null
          monthly_price: number | null
          owner_id: string
          pets_allowed: boolean
          price: number
          rental_type: Database["public"]["Enums"]["rental_type"]
          size: number | null
          status: Database["public"]["Enums"]["property_status"]
          title: string
          type: Database["public"]["Enums"]["property_type"]
          updated_at: string
          verified: boolean
          weekly_price: number | null
        }
        Insert: {
          agent_id?: string | null
          availability?: Json | null
          available_from?: string | null
          bathrooms?: number
          bedrooms?: number
          cancellation_policy?:
            | Database["public"]["Enums"]["cancellation_policy"]
            | null
          check_in_time?: string | null
          check_out_time?: string | null
          cleaning_fee?: number | null
          created_at?: string
          daily_price?: number | null
          deposit?: number | null
          description?: string | null
          full_address?: string | null
          furnished?: boolean
          id?: string
          images?: string[]
          instant_book?: boolean
          is_new?: boolean
          latitude?: number | null
          lease_term?: string | null
          location: string
          longitude?: number | null
          max_guests?: number | null
          minimum_stay?: number | null
          monthly_price?: number | null
          owner_id: string
          pets_allowed?: boolean
          price?: number
          rental_type?: Database["public"]["Enums"]["rental_type"]
          size?: number | null
          status?: Database["public"]["Enums"]["property_status"]
          title: string
          type: Database["public"]["Enums"]["property_type"]
          updated_at?: string
          verified?: boolean
          weekly_price?: number | null
        }
        Update: {
          agent_id?: string | null
          availability?: Json | null
          available_from?: string | null
          bathrooms?: number
          bedrooms?: number
          cancellation_policy?:
            | Database["public"]["Enums"]["cancellation_policy"]
            | null
          check_in_time?: string | null
          check_out_time?: string | null
          cleaning_fee?: number | null
          created_at?: string
          daily_price?: number | null
          deposit?: number | null
          description?: string | null
          full_address?: string | null
          furnished?: boolean
          id?: string
          images?: string[]
          instant_book?: boolean
          is_new?: boolean
          latitude?: number | null
          lease_term?: string | null
          location?: string
          longitude?: number | null
          max_guests?: number | null
          minimum_stay?: number | null
          monthly_price?: number | null
          owner_id?: string
          pets_allowed?: boolean
          price?: number
          rental_type?: Database["public"]["Enums"]["rental_type"]
          size?: number | null
          status?: Database["public"]["Enums"]["property_status"]
          title?: string
          type?: Database["public"]["Enums"]["property_type"]
          updated_at?: string
          verified?: boolean
          weekly_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_properties: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_properties_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
          role?: never
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
          phone?: string | null
          role?: never
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      agent_app_status: "pending" | "approved" | "rejected"
      app_role: "admin" | "agent" | "customer"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      cancellation_policy: "flexible" | "moderate" | "strict"
      payment_status: "pending" | "paid" | "refunded"
      property_status: "active" | "pending" | "sold" | "rented" | "inactive"
      property_type:
        | "room"
        | "house"
        | "apartment"
        | "guesthouse"
        | "hotel"
        | "lodge"
        | "camp"
        | "commercial"
        | "airbnb"
        | "mbashu"
      rental_type: "long-term" | "short-term"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_app_status: ["pending", "approved", "rejected"],
      app_role: ["admin", "agent", "customer"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      cancellation_policy: ["flexible", "moderate", "strict"],
      payment_status: ["pending", "paid", "refunded"],
      property_status: ["active", "pending", "sold", "rented", "inactive"],
      property_type: [
        "room",
        "house",
        "apartment",
        "guesthouse",
        "hotel",
        "lodge",
        "camp",
        "commercial",
        "airbnb",
        "mbashu",
      ],
      rental_type: ["long-term", "short-term"],
    },
  },
} as const
